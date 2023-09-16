export const Footer = () => {
    return  <footer className="footer">
        <span className="todo-count">4 tareas pendientes</span>
        <ul className="filters">
            <li><a href="/">Todas</a></li>
            <li><a className="selected" href="/">Activas</a></li>
            <li><a href="/">Completadas</a></li>
        </ul>
        <button className="clear-completed">Borrar completados</button>
    </footer>;
};
