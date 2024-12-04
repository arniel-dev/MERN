

const SideContent =()=> {
  return (
   <> {/* CONTENT SECTION */}
   <div className="row content-row">
     {/* SIGN IN CONTENT */}
     <div className="col align-items-center flex-col">
       <div className="text sign-in">
         <h2>Welcome</h2>
       </div>
       <div className="img sign-in"></div>
     </div>

     {/* SIGN UP CONTENT */}
     <div className="col align-items-center flex-col">
       <div className="img sign-up"></div>
       <div className="text sign-up">
         <h2>Join with us</h2>
       </div>
     </div>
   </div>
   </>
  )
}
export default SideContent
