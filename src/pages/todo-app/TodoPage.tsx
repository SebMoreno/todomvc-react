import 'todomvc-app-css/index.css';

export const TodoPage = () => {
    return <main className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="¿Qué quieres hacer?" autoFocus/>
        </header>
        <ul className="todo-list">
            <li className="completed">
                <div className="view">
                    <input type="checkbox" className="toggle"/>
                    <label htmlFor="">todo1</label>
                    <button className="destroy"/>
                </div>
                <input type="text" className="edit"/>
            </li>
        </ul>
        <footer className="footer">
            <span className="todo-count">4 tareas pendientes</span>
            <ul className="filters">
                <li><a href="/">Todas</a></li>
                <li><a className="selected" href="/">Activas</a></li>
                <li><a href="/">Completadas</a></li>
            </ul>
            <button className="clear-completed">Borrar completados</button>
        </footer>
    </main>;
};
