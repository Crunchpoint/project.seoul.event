const ToTopBtn = () => {
  return (
    <button className={window.scrollY > 300 ? "to-top active" : "to-top"} onClick={() => window.scrollTo(0, 0)}>
      ⇧
    </button>
  );
};
export default ToTopBtn;
