import { ChangeEvent, FormEvent, useState } from 'react'

function NameForm(props: any) {
    const [state, setState] = useState(
        {
            name: '',
            article: 'write a article.',
            fruit: 'coconut',
            age: 18,
            favorite: false
        })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        alert('提交的名字: ' + state.name);
        alert('提交的年龄: ' + state.age);
        alert('提交的文章: ' + state.article);
        alert('提交的风味: ' + state.fruit);
        alert('提交的favorite: ' + state.favorite);
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

    const handleChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var newData = Object.assign({}, state, { [name]: value });
        setState(newData);
    }

    return (
        <div className="card">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    名字 :
                    <input type="text" name="name" value={state.name} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    年龄 :
                    <input type="number" name="age" value={state.age} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    喜爱 :
                    <input type="checkbox" name="favorite" checked={state.favorite} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    文章:
                    <textarea name="article" value={state.article} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    选择你喜欢的风味:
                    <select name="fruit" value={state.fruit} onChange={(e) => handleChange(e)}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </div>
                <input type="submit" value="提交" />
            </form>
        </div>
    )
}

export default NameForm