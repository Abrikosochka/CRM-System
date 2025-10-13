import './error.css'
const Error = (props) => {
  const handleClick = () => {
    props.onUpdateError(prev => prev.open = false)
  }

  return (
    <div className='error' onClick={handleClick}>
      <div>
        <p>{
          props.text
        }</p>
      </div>
    </div>
  )
}

export default Error
