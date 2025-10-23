import './error.css'

interface errorProps {
  text: string,
  onUpdateError: () => void
}

const Error = (props: errorProps) => {
  const handleClick = () => {
    props.onUpdateError();
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
