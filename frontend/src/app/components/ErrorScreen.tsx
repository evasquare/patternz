import style from "./errorScreen.module.css";

export default function ErrorScreen({
    errorMessage,
}: {
    errorMessage: string;
}) {
    return <div className={style.errorScreen}>{errorMessage}</div>;
}
