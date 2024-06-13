import { useState,useCallback,useEffect,useRef } from "react"


function App() {
  const [length,setLength]=useState(8);
  const [numberAllow,setNumberAllow]=useState(false);
  const [charAllow,setCharAllow]=useState(false);
  const [password,setPassword]=useState("");
  //useRef Hook
  const passwordRef=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllow) str +="0123456789"
    if(charAllow) str +="/*-+!@#$%^&*()[]"
    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random() * str.length +1);
      pass +=str.charAt(char)
      
    }
    setPassword(pass)   
  }, [length,numberAllow,charAllow,setPassword])

  const CopyPass=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },
 [password]);


  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllow,charAllow,passwordGenerator])
  return (
    <>
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 overflow-hidden">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex justify-center shadow-md rounded-lg overflow-hidden mb-full">
        <input 
        type="text" 
        value={password}
        className="outline-none w-full py-1 my-3 px-4 rounded-l-lg"
        placeholder="password"
        readOnly
        ref={passwordRef}
        />
        <button
        className="text-white bg-blue-500 w-20 text-center text-sm outline-none py-1 my-3 px-4 rounded-r-xl hover:bg-blue-400"
        onClick={CopyPass}
        >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
       <div className="flex items-center gap-x-1">
        <input type="range"
        min={6}
        max={100}
        value={length}
        className="cursor-pointer"
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Lengt:{length} </label>
       </div>
       <div className="flex items-center gap-x-1">
        <input type="checkbox"
        defaultChecked={numberAllow}
        id="numberInput"
        onChange={()=>{
          setNumberAllow((prev) => !prev);
        }}
        />
        <label> Numbers</label>
       </div>
       <div className="flex items-center gap-x-1">
        <input type="checkbox"
        defaultChecked={charAllow}
        id="numberInput"
        onChange={()=>{
          setCharAllow((prev) => !prev);
        }}
        />
        <label> Charecter</label>
       </div>
      </div>
    </div>
    </>
  )
}

export default App
