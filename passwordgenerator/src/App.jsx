import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  // maintaing the hook for all the factors that affect the password
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [symbolAllow, setSymbolAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);             // reference hook

//on change functions for the checkboxes
  const numberFunc =() => {
    setNumberAllow((prevVal) => !prevVal)
  }
  const symbolFunc = () => {
    setSymbolAllow(prevVal => !prevVal)
  }

// for copy the password 
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()            // to make visibbility more appearing to user
    window.navigator.clipboard.writeText(password)
  }
  ,[password]) 

  // creating the useCallback hook for the password genration it takes a call back and a dependency list
  // the useCallback hook caches a function definition between multiple re renders ie the function will always run if any of the dependency is altered without a reload 
  const createPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str = str + "1234567890"
    if(symbolAllow) str = str + "!@#$%^&*"

    for(let i = 1 ; i<=length;i++){
      let index =  Math.floor(Math.random()*str.length +1)
      pass = pass + str.charAt(index);
    }
    setPassword(pass);
    }, [length, numberAllow, symbolAllow, setPassword])  // we are passing sePassword that is because that only sets the state of password

    useEffect(()=> {
      createPassword()
    }, [length,numberAllow,symbolAllow])

  return (
    <>
      <div className='bg-white rounded-2xl w-1/2 h-1/4 p-3'>
        <div className='p-4 bg-slate-400'>
          <input
            className='rounded-xl border-black' 
            type="text"
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
          /> 
          <button className='bg-black text-white' onClick={copyPassword}>Copy</button>
        </div>
        <div className='p-4 bg-slate-400 gap-5'>
          <input 
            type="range"
            min={6}
            max={16}
            onChange={(e) => {setLength(e.target.value)}}
            value={length}
          />
          <label>length({length})</label>
          <input 
            type="checkbox"
            value={numberAllow}
            onChange={numberFunc}
          />
          <label>Number</label>
          <input 
            type="checkbox"
            value={symbolAllow}
            onChange={symbolFunc}
          />
          <label>Number</label>
        </div>
      </div>
    </>
  )
}

export default App
