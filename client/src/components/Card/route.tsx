import { Card, Button } from '@nextui-org/react';

export default function TrainCard() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[360px] shadow-lg">
        {/* Header Section */}
        <div className="p-4 border-b">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">20:03 - 21:16</h2>
              <p className="text-sm text-gray-500">1h 7min</p>
              <div className="flex space-x-2 mt-2">
                <p className="text-xs text-red-600">20:16</p>
                <p className="text-xs text-red-600">21:23</p>
              </div>
            </div>
          </div>
        </div>

        {/* Train Connections Section */}
        <div className="flex p-4 space-x-2">
          {/* Train Badges */}
          <span className="flex-1 text-center bg-gray-700 text-white rounded-lg py-1 px-2 text-sm">
            ICE 645
          </span>
          <span className="flex-1 text-center bg-gray-500 text-white rounded-lg py-1 px-2 text-sm">
            RB
          </span>
        </div>

        {/* Body Section */}
        <div className="p-4">
          <div className="flex justify-between">
            <p className="font-semibold">Wolfsburg Hbf</p>
            <p className="font-semibold">Berlin Hbf</p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-3">
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            <p>Es liegen Meldungen vor.</p>
          </div>

          <div className="mt-3">
            <details>
              <summary className="cursor-pointer text-blue-500">Details</summary>
              <p className="text-gray-600 mt-2">Additional information can go here.</p>
            </details>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t flex justify-between items-center">
          <p className="text-lg font-semibold">ab 67,50 €</p>
          <Button color="primary">
            Weiter
          </Button>
        </div>
      </Card>
    </div>
  );
}