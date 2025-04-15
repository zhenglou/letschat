function Button({children}: { children: React.ReactNode }) {
  return <div className='underline' style={{color:'red'}}>Hello letschat! <button>{children}</button> </div>;
}

export default Button;