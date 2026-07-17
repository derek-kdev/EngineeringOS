"use client";


/*
|--------------------------------------------------------------------------
| Prototype Status Bar
|--------------------------------------------------------------------------
|
| Displays workspace state.
|
| Future:
|
| WebSocket:
| /api/v1/prototypes/:id/status
|
| Shows:
| - simulation state
| - save state
| - connection state
|
|--------------------------------------------------------------------------
*/


export default function StatusBar(){


    return (

        <footer
            className="
                h-10
                flex
                items-center
                justify-between
                px-6
                border-t
                border-white/10
                bg-black/20
                text-xs
                text-slate-400
            "
        >

            <span>
                Prototype Lab Connected
            </span>


            <span>
                Simulation Engine: Idle
            </span>


        </footer>

    );

}