

const ProgressBar = (props) => {
    const { completed } = props;
  
    const containerStyles = {
      height: 4,
      width: '100%',
      backgroundColor: "#FFFFFF0F",
      borderRadius: 2,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: "#85FF3A",
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    );
  };
  
  export default ProgressBar;