import { Link } from "react-router-dom"
export const BottomWarning = ({ label, linkLabel, to }) => {
    return <div className="text-slate-500 " >
        {label}
        <Link to={to} className="pointer pl-1 underline cursor-pointer">{ linkLabel }</Link>
    </div>
}