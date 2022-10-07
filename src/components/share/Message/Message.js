function Message(props) {
    return (
        <>
            { props.message ?
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                     {props.message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                : "" }
        </>
    )
}

export default Message;
