
const Address = ({ address }) => {
    if (address) {
        return (

            <p> {address?.addressLine1 || 'NA'}  <br></br>
                {address?.addressLine2 || 'NA'} <br></br>
                {address?.country || 'NA'} <br></br>
                {address?.zipcode || 'NA'}<br></br></p>
        )
    } 
    return (<p>Address not found!</p>)
}

export default  Address;