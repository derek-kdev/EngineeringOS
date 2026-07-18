"use client";

/*
|--------------------------------------------------------------------------
| Viewport Toolbar
|--------------------------------------------------------------------------
|
| Controls for the future CAD / simulation viewport.
|
| Future integrations:
|
| - Camera controls
| - Render modes
| - Grid toggle
| - Measurement tools
| - CAD commands
|
|--------------------------------------------------------------------------
*/


export default function ViewportToolbar() {


    /*
    |--------------------------------------------------------------------------
    | BACKEND PLACEHOLDER
    |--------------------------------------------------------------------------
    |
    | Future:
    |
    | GET /api/v1/prototypes/:id/viewport/settings
    |
    |--------------------------------------------------------------------------
    */


    return (

        <div
            className="
                h-12
                flex
                items-center
                justify-between
                px-4
                rounded-xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
            "
        >

            <div
                className="
                    text-sm
                    text-slate-300
                "
            >
                Viewport Controls
            </div>


            <div
                className="
                    flex
                    gap-2
                    text-xs
                    text-slate-400
                "
            >

                <button>
                    Orbit
                </button>

                <button>
                    Pan
                </button>

                <button>
                    Measure
                </button>

            </div>


        </div>

    );

}