export const Appbar = ({username}) => {
    return <div className="shadow h-14 flex justify-between">
        <div className="flex justify-center">
             Payment Application
        </div>
         
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">Hello { username }</div>
            <div className="rounded-full h-12 w-12 bg-slate-400 flex justify-center mt-1 mr-2 ">
                <div className="flex flex-col justify-center h-full text-ul">U</div>
            </div>
        </div>
    </div>
}