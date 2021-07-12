
import styles from '../styles/Home.module.css'
import Profile from '../components/profile'
import ProfileData from '../types/profileData'
const Profiles = ({ data, name }) => { 
   let  validData : Array<ProfileData>  = data?.filter(f => f.name);
    if (!data || validData.length == 0) {
        return (<div className={styles.grid}> No records found...</div>)
    }
   
    return ( 
        <div className={styles.grid}> {
            validData?.filter(f => {
                if (f.name && name) {
                    return f.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
                }else if(!name){
                    return true;
                }
                return false;
            }).map((profile) => (
                <Profile data={profile}></Profile>
            ))
        }
        </div> 
    )
}

export default Profiles;