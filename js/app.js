/* ============ app.jsx — root: state, timer, persistence, routing ============ */

function App() {
  const [theme, setThemeState] = useState(() => EXAM.getTheme());
  const setTheme = t => {
    EXAM.setTheme(t);
    setThemeState(t);
  };
  useEffect(() => {
    EXAM.setTheme(theme);
  }, []);

  // restore
  const saved = useMemo(() => EXAM.load(), []);
  const [screen, setScreen] = useState(() => saved && saved.done ? 'result' : 'home');
  const [done, setDone] = useState(() => !!(saved && saved.done));
  const [exam, setExam] = useState(() => saved ? {
    ids: saved.ids,
    answers: saved.answers || {},
    flags: saved.flags || {},
    revealed: saved.revealed || {},
    config: saved.config
  } : null);
  const [remaining, setRemaining] = useState(() => saved ? saved.remaining : 0);
  const resumeData = saved && !saved.done ? {
    ids: saved.ids,
    answers: saved.answers,
    remaining: saved.remaining,
    mode: saved.config && saved.config.mode || 'formal'
  } : null;

  // persist
  useEffect(() => {
    if (!exam) return;
    EXAM.save({
      ...exam,
      remaining,
      done,
      ts: Date.now()
    });
  }, [exam, remaining, done]);

  // timer — only runs while actively taking a TIMED exam
  useEffect(() => {
    if (screen !== 'exam' || done) return;
    if (!exam || !exam.config || !exam.config.durationSec) return;
    const t = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(t);
          doSubmit();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [screen, done, exam && exam.config]);

  // ---- session lifecycle ----
  function beginSession(config, ids) {
    setExam({
      ids,
      answers: {},
      flags: {},
      revealed: {},
      config
    });
    setRemaining(config.durationSec || 0);
    setDone(false);
    setScreen('exam');
    window.scrollTo({
      top: 0
    });
  }
  function beginFormal(cfg) {
    const config = {
      ...cfg,
      mode: 'formal'
    };
    beginSession(config, EXAM.draw(config));
  }
  function setAnswer(id, arr) {
    setExam(e => ({
      ...e,
      answers: {
        ...e.answers,
        [id]: arr
      }
    }));
  }
  function toggleFlag(id) {
    setExam(e => ({
      ...e,
      flags: {
        ...e.flags,
        [id]: !e.flags[id]
      }
    }));
  }
  function reveal(id) {
    setExam(e => {
      if (e.config.mode === 'study') {
        const correct = EXAM.arrEq(e.answers[id] || [], EXAM.get(id).ans);
        EXAM.study.record(id, correct);
      }
      return {
        ...e,
        revealed: {
          ...e.revealed,
          [id]: true
        }
      };
    });
  }
  function doSubmit() {
    setDone(true);
    setScreen('result');
    window.scrollTo({
      top: 0
    });
  }
  function goHome() {
    EXAM.clear();
    setExam(null);
    setDone(false);
    setRemaining(0);
    setScreen('home');
  }
  function exitToHome() {
    setScreen('home');
    window.scrollTo({
      top: 0
    });
  }
  function retry() {
    const m = exam && exam.config ? exam.config.mode : 'formal';
    EXAM.clear();
    setExam(null);
    setDone(false);
    setScreen(m === 'draw' ? 'drawSetup' : m === 'study' ? 'studySetup' : 'setup');
  }
  function resume() {
    setScreen('exam');
    window.scrollTo({
      top: 0
    });
  }
  function startMode(modeId) {
    setScreen(modeId === 'draw' ? 'drawSetup' : modeId === 'study' ? 'studySetup' : 'setup');
    window.scrollTo({
      top: 0
    });
  }

  // ---- routing ----
  if (screen === 'home') return /*#__PURE__*/React.createElement(Home, {
    theme: theme,
    setTheme: setTheme,
    resume: resumeData,
    onStart: startMode,
    onResume: resume
  });
  if (screen === 'setup') return /*#__PURE__*/React.createElement(Setup, {
    theme: theme,
    setTheme: setTheme,
    onBack: () => setScreen('home'),
    onBegin: beginFormal
  });
  if (screen === 'drawSetup') return /*#__PURE__*/React.createElement(DrawSetup, {
    theme: theme,
    setTheme: setTheme,
    onBack: () => setScreen('home'),
    onBegin: beginSession
  });
  if (screen === 'studySetup') return /*#__PURE__*/React.createElement(StudySetup, {
    theme: theme,
    setTheme: setTheme,
    onBack: () => setScreen('home'),
    onBegin: beginSession
  });
  if (screen === 'exam' && exam) return /*#__PURE__*/React.createElement(ExamScreen, {
    exam: exam,
    remaining: remaining,
    theme: theme,
    setTheme: setTheme,
    setAnswer: setAnswer,
    toggleFlag: toggleFlag,
    reveal: reveal,
    onSubmit: doSubmit,
    onExit: exitToHome
  });
  if (screen === 'result' && exam) return /*#__PURE__*/React.createElement(Result, {
    exam: exam,
    theme: theme,
    setTheme: setTheme,
    onHome: goHome,
    onRetry: retry
  });
  return /*#__PURE__*/React.createElement(Home, {
    theme: theme,
    setTheme: setTheme,
    resume: resumeData,
    onStart: startMode,
    onResume: resume
  });
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));