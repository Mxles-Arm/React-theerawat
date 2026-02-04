import picture from '../image/Self.jpg'
import '../css/tct.css'
function Student(props){
    return(
        
        <div >
            
            <h1> Introduct </h1>
            <img  src = {picture} alt='myself picture'width = {200} />
            <hr />
            Name: {props.stdInfo.name //props.name
            }
            <hr />
            ID: {props.stdInfo.stdid //props.stdid
            }
            <hr />
            Section: {props.stdInfo.sect //props.stdid
            }
            <hr />
        </div>
    )
}
export default Student;