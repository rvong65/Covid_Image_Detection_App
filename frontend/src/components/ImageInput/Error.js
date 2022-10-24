import React from 'react';

const Error = () => {
    return(
        <div>
            <article className=" flex items-center br3 ba b--black-10 w-100 w-50-m w-25-l mw6 mt1 shadow-5 center ph2" style={{backgroundColor: "red"}}>
                <ion-icon name="warning" size="large"></ion-icon>
                <p style={{color: "white", fontWeight: "bold", fontSize: "14px"}}>Please input another image and make sure that it is in the proper format</p>
            </article>
        </div>
    );
}

export default Error