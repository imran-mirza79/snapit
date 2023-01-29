import React, { useEffect, useState } from "react";
import "./styles.css";
const Error = () => {
    const [ loading, setLoading ] = useState("loading");

    useEffect(() => {
        setTimeout(() => {
            setLoading("");
        }, 1000)
    }, [loading])
	return (
			<div className={loading}>
				<h1>500</h1>
				<h2>
					Unexpected Error <b>:(</b>
				</h2>
				<div className="gears">
					<div className="gear one">
						<div className="bar"></div>
						<div className="bar"></div>
						<div className="bar"></div>
					</div>
					<div className="gear two">
						<div className="bar"></div>
						<div className="bar"></div>
						<div className="bar"></div>
					</div>
					<div className="gear three">
						<div className="bar"></div>
						<div className="bar"></div>
						<div className="bar"></div>
					</div>
				</div>
			</div>
	);
};

export default Error;
