import React from 'react'
import HashLoader from 'react-spinners/HashLoader'
import './loaderSpinner.css'

const defaultOverride = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const defaultColor = "#03e9f4";

const defaultSize = 150;

export default function LoaderSpinner({ color, loading, cssOverride, size, height, width, radius }) {
  return (
    <div className='loaderSpinner'>
      <HashLoader color={color || defaultColor} loading={loading || true} cssOverride={cssOverride || defaultOverride} size={size || defaultSize} height={height} width={width} radius={radius} />
    </div>
  )
}
