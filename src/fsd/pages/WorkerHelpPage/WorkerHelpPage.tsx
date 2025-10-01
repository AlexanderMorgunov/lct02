export const WorkerHelpPage = () => {
  return (
    <div className="h-full w-full">
      <object
        data="/pdfs/worker.pdf" // путь до pdf в public/
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>
          Ваш браузер не поддерживает отображение PDF.{" "}
          <a href="/pdfs/worker.pdf" target="_blank">
            Скачать
          </a>
        </p>
      </object>
    </div>
  );
};
