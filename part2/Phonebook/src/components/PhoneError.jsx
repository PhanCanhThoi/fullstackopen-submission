const PhoneError = ({ error,success }) => {
  if (error!== null) {
    return (
    <div className="error">
      <p>{error}</p>
    </div>
  );
  }
  if(success !== null) {
    return (
      <div className="success">
        <p>{success}</p>
      </div>
    );
  }
  return null;
  
}
export default PhoneError;