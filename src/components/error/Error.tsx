import type React from 'react';
import './error.css'

interface Props {
  textError: string,
  onCloseModal: () => void
}

const Error: React.FC<Props> = (props) => {
  const handleClick = (): void => {
    props.onCloseModal();
  }

  return (
    <div className='error' onClick={handleClick}>
      <div>
        <p>{
          props.textError
        }</p>
      </div>
    </div>
  )
}

export default Error
