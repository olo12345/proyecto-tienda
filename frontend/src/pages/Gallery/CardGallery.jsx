import React from 'react'

export const CardGallery = () => {
    return (
        <div>
            {/* Tarjetas */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "30px",
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
            </div>
        </div>
    )
}
