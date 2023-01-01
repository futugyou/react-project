import { ChangeEvent, FormEvent, useState } from 'react'

function NameForm(props: any) {
    const [state, setState] = useState(
        {
            name: '',
            article: 'write a article.',
            fruit: 'coconut'
        })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        alert('提交的名字: ' + state.name);
        alert('提交的文章: ' + state.article);
        alert('提交的风味: ' + state.fruit);
        event.preventDefault();
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        var newData = Object.assign({}, state, { name: event.target.value });
        setState(newData);
    }

    const handleArticleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        var newData = Object.assign({}, state, { article: event.target.value });
        setState(newData);
    }

    const handleFruitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        var newData = Object.assign({}, state, { fruit: event.target.value });
        setState(newData);
    }

    return (
        <div className="card">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    名字 :
                    <input type="text" value={state.name} onChange={(e) => handleNameChange(e)} />
                </div>
                <div>
                    文章:
                    <textarea value={state.article} onChange={(e) => handleArticleChange(e)} />
                </div>
                <div>
                    选择你喜欢的风味:
                    <select value={state.fruit} onChange={(e) => handleFruitChange(e)}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option selected value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </div>
                <input type="submit" value="提交" />
            </form>
        </div>
    )
}

export default NameForm