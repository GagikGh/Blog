

function EmptyData({ src = '', label = "No Data" }: { src?: string, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-60 p-8 bg-gray-50 rounded-lg">
            {/*<img*/}
            {/*    src={src}*/}
            {/*    alt="Empty Data"*/}
            {/*    className="w-32 h-32 object-contain mb-4"*/}
            {/*/>*/}
            <p className="text-gray-500 text-lg font-medium">{label}</p>
        </div>
    );
}

export default EmptyData;
