import {FC,useState} from 'react';
import {useRouter} from 'next/router'


type Props = {}

export const SearchBarEn: FC<Props> = (props) => {
    const router = useRouter();
    //検索ワードを入れるuseState
    const [searchWord, setSearchWord] = useState("");

    // 検索ワードをkeywordにして/searchにpush
    function handleClick() {
        if(searchWord === "") return;
        console.log(searchWord);
        router.push(`/en/search?keyword=${searchWord}`)
    }

    return (
        <div>
            <form onSubmit={e => {
                handleClick();
                e.preventDefault();
            }}>
                <div className="input-group">
                    <button className="btn btn-primary" onClick={handleClick}>Search</button>
                    <input type="text" className="form-control" value={searchWord} onChange={e => setSearchWord(e.target.value)} />
                </div>
            </form>
        </div>
    )
};