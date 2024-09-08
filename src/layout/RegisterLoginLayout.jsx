import style from "../css/RegisterLoginLayout.module.css";

const RegisterLoginLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className={`card ${style.customCard} border border-3 `}>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLoginLayout;
