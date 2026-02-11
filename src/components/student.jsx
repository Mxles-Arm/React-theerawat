import Leaf from '../image/Leaffy.jpg'
import '../css/tct.css';
function Student(props){
    return(
        
        <div >
            <div style={{backgroundColor: '#CCC'}}>
            <h1>My Profile</h1>
            <div className='img-center'><img src={Leaf} alt="Leaf" width="200" height="200"/></div>
            </div>
            <h1> Introduct </h1>
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