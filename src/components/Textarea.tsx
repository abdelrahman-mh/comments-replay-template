import React, { useRef, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const Textarea: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      if (value) {
        textAreaRef.current.setSelectionRange(value.length, value.length);
      }
    }
  }, []);

  return <textarea className='form__textarea' spellCheck='false' name='content' id='content' value={value} onChange={onChange} placeholder={placeholder} ref={textAreaRef}></textarea>;
};

export default Textarea;
