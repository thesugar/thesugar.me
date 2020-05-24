import React, { useState, useEffect } from 'react'

const handleSubmit = (
    id: string,
    name: string,
    comment: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setComment: React.Dispatch<React.SetStateAction<string>>,
    setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<string>>,
  ) => {
      if (!comment) {
          setErrMsg('コメントは入力必須です')
          return undefined
      }
  
      if (!name) {
          name = 'NO NAME'
      }
  
      fetch('/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            //url: window.location.toString(),
            //ua: navigator.userAgent,
            "postId": `${id}`,
            "name" : `${name}`,
            "comment" : `${comment}`
          })
        })
    //setName('')
    setComment('')
    setErrMsg('')
    setShouldFetch(true)
}
  
  
const getComments = async (id :string) => {
    const res = await fetch(`/api/comment?id=${id}`)
    return await res.json()
}

export const Comments = ({id} : {id: string}) => {

    const [comment, setComment] = useState('')
    const [name, setName] = useState('')
    const [currentComments, setCurrentComments] = useState('')
    const [shouldFetch, setShouldFetch] = useState(true)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (!shouldFetch) {
            return undefined
        }
        const func = async () => {
            const value = await getComments(id)
            setCurrentComments(JSON.parse(JSON.stringify(value)).comments)
        }
        func()
        setShouldFetch(false)
    }, [shouldFetch])

    return (
        <React.Fragment>
        <div>
        <div className='commentContainer'>
        <input type="text" className="nameArea" placeholder="お名前" value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type="text" placeholder="コメントする" value={comment} onChange={(e) => setComment(e.target.value)}></input>
        <button onClick={() => handleSubmit(id, name, comment, setName, setComment, setShouldFetch, setErrMsg)}><i className="fas fa-paper-plane"></i></button>
        </div>
        <div className="errorMessage">{errMsg}</div>
        <div className="undermargin" />
        <style jsx>{`
            .commentContainer {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0;
            }

            .nameArea {
                margin-right: 10px;
                width: 30%;
            }

            input {
                font-size: 16px;
                width: 100%;
                border: none;
                outline: none;
                padding-bottom: 8px;
                box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
                border-bottom:1px solid #cccccc;
            }

            button {
                font-size: large;
                border: none;
            }

            button:hover {
                cursor: pointer;
            }
            
            .errorMessage {
                color: red;
                font-family: "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
                font-size: 0.8rem;
                text-align: right;
                margin-right: 1.8rem;
            }

            .undermargin {
                margin-bottom: 4rem;
            }
        `}</style>
    </div>

    {currentComments ? (Array.from(currentComments)).map((eachComment: any) => {
        
        const commentTagsEscaped = eachComment.comment.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        const reg = new RegExp("((https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+))")
        const commentWithLink = commentTagsEscaped.replace(reg,"<a href='$1' target='_blank' style='padding: 0;'>$1</a>")

        return (
        <div key={eachComment.postedAt+"-"+eachComment.name} className="each-comment">
            <div className="name-date-container">
            <div className="name">{eachComment.name}</div>
            <div className="postedAt">{eachComment.postedAt}</div>
            </div>
            <div className="comment" dangerouslySetInnerHTML={{__html : commentWithLink}}></div>
            <style jsx>{`
            .name-date-container {
                display: flex;
                justify-content: space-between;
            }

            .comment {
                font-family: "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
                font-size: 0.8rem;
            }

            .name {
                font-family: "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
                font-size: 0.8rem;
                color: #4f4f4f;
            }

            .postedAt {
                font-family: "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
                font-size: 0.8rem;
                color: #4f4f4f;
            }

            .each-comment {
                margin-bottom: 2.0rem;
            }

            .linkInComment {
                padding: 0;
            }
            `}</style>
        </div>)
    }) : ''}
    </React.Fragment>

    )
}