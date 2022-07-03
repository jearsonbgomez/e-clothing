import './form-input.styles.scss';

const FormInput = ({ label, options }) => {
  return (
    <div className="group">  
      <input className="form-input" {...options}/>
      {
        label && 
        <label 
          className={`${
            options.value.length ? 'shrink' : ''} 
            form-input-label`
          }
        >{ label }</label>
      }
    </div>
  );
}
export default FormInput;