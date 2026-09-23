import Close from '../../assets/close.png';

const FileAdd = ({file,supp}) => {

    const {name,size} = file;

    function handelInfos(event){
        //console.log( name, size );
        supp( name );
    }

    return(
        <div className="item">
            <img className="img_close" src={Close} onClick={handelInfos} />
            {name}
        </div>
    )
}
export default FileAdd;