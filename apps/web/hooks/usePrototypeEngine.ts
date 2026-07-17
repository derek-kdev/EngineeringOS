"use client";


import { useState } from "react";



export default function usePrototypeEngine() {



  /*
  |--------------------------------------------------------------------------
  | COMPONENT PANEL STATE
  |--------------------------------------------------------------------------
  */


  const [
    leftExpanded,
    setLeftExpanded,
  ] = useState(false);






  /*
  |--------------------------------------------------------------------------
  | SIMULATION STATE
  |--------------------------------------------------------------------------
  */


  const [
    running,
    setRunning,
  ] = useState(false);







  /*
  |--------------------------------------------------------------------------
  | VIEWPORT STATE
  |--------------------------------------------------------------------------
  */


  const [
    wireframe,
    setWireframe,
  ] = useState(false);









  /*
  |--------------------------------------------------------------------------
  | COMPONENT PANEL ACTIONS
  |--------------------------------------------------------------------------
  */


  function toggleLeftPanel(){

    setLeftExpanded(
      previous => !previous
    );

  }









  /*
  |--------------------------------------------------------------------------
  | SIMULATION ACTIONS
  |--------------------------------------------------------------------------
  */


  function startSimulation(){

    setRunning(true);

  }





  function stopSimulation(){

    setRunning(false);

  }





  function toggleSimulation(){

    setRunning(
      previous => !previous
    );

  }









  /*
  |--------------------------------------------------------------------------
  | VIEWPORT ACTIONS
  |--------------------------------------------------------------------------
  */


  function toggleWireframe(){

    setWireframe(
      previous => !previous
    );

  }








  function resetViewport(){

    setWireframe(false);

  }









  return {


    /*
    |--------------------------------------------------------------------------
    | STATE
    |--------------------------------------------------------------------------
    */


    leftExpanded,

    running,

    wireframe,





    /*
    |--------------------------------------------------------------------------
    | ACTIONS
    |--------------------------------------------------------------------------
    */


    toggleLeftPanel,


    startSimulation,


    stopSimulation,


    toggleSimulation,


    toggleWireframe,


    resetViewport,



  };

}