
import styles from '../styles/Home.module.css'
import Address  from './address';

const Profile = ({ data }) => {
    return (
        <div className={styles.card}>
            <h2 data-cy="profile">{data.name} </h2>
            <Address address={data.address}></Address>
        </div>
    );
}

export default Profile;