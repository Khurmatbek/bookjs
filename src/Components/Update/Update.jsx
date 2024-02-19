import Alert from 'react-bootstrap/Alert';
import "./Update.css"


function AdditionalContentExample({update,setUpdate}) {
    return (
        <Alert variant="success">
            <Alert.Heading  className='text-[50px] text-white mb-[20px]'> Hey Update 🎉</Alert.Heading>
            <hr />
            <p className=" mt-[15px]text-[20px] text-white">
                Congratulations, you have successfully updated your information, click close to update
            </p>
            <div className='text-end pt-[60px]'>
                <button onClick={()=>setUpdate(false)} className='w-[170px] p-[10px] border-[px] bg-red-600 text-white mr-0'>
                    Close
                </button>
            </div>
        </Alert>
    );
}

export default AdditionalContentExample;