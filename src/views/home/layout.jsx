import React, { useState, useEffect } from "react";
import productsService from '../../service/products'
import ProductCard from "./products/productCard";


const Layout = () => {
  
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center gap-2 mb-4">
              Traffic Overview
              <span>
                <iconify-icon
                  icon="solar:question-circle-bold"
                  className="fs-7 d-flex text-muted"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-success"
                  data-bs-title="Traffic Overview"
                />
              </span>
            </h5>
            <div id="traffic-overview"></div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-body text-center">
            <img
              src="../assets/images/backgrounds/product-tip.png"
              alt="image"
              className="img-fluid"
              width={205}
            />
            <h4 className="mt-7">Productivity Tips!</h4>
            <p className="card-subtitle mt-2 mb-3">
              Duis at orci justo nulla in libero id leo molestie sodales
              phasellus justo.
            </p>
            <button className="btn btn-primary mb-3">View All Tips</button>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">View by page title and screen class</h5>
            <div className="table-responsive">
              <table className="table text-nowrap align-middle mb-0">
                <thead>
                  <tr className="border-2 border-bottom border-primary border-0">
                    <th scope="col" className="ps-0">
                      Page Title
                    </th>
                    <th scope="col">Link</th>
                    <th scope="col" className="text-center">
                      Pageviews
                    </th>
                    <th scope="col" className="text-center">
                      Page Value
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th scope="row" className="ps-0 fw-medium">
                      <span className="table-link1 text-truncate d-block">
                        Welcome to our website
                      </span>
                    </th>
                    <td>
                      <a
                        href="javascript:void(0)"
                        className="link-primary text-dark fw-medium d-block"
                      >
                        /index.html
                      </a>
                    </td>
                    <td className="text-center fw-medium">18,456</td>
                    <td className="text-center fw-medium">$2.40</td>
                  </tr>
                  <tr>
                    <th scope="row" className="ps-0 fw-medium">
                      <span className="table-link1 text-truncate d-block">
                        Modern Admin Dashboard Template
                      </span>
                    </th>
                    <td>
                      <a
                        href="javascript:void(0)"
                        className="link-primary text-dark fw-medium d-block"
                      >
                        /dashboard
                      </a>
                    </td>
                    <td className="text-center fw-medium">17,452</td>
                    <td className="text-center fw-medium">$0.97</td>
                  </tr>
                  <tr>
                    <th scope="row" className="ps-0 fw-medium">
                      <span className="table-link1 text-truncate d-block">
                        Explore our product catalog
                      </span>
                    </th>
                    <td>
                      <a
                        href="javascript:void(0)"
                        className="link-primary text-dark fw-medium d-block"
                      >
                        /product-checkout
                      </a>
                    </td>
                    <td className="text-center fw-medium">12,180</td>
                    <td className="text-center fw-medium">$7,50</td>
                  </tr>
                  <tr>
                    <th scope="row" className="ps-0 fw-medium">
                      <span className="table-link1 text-truncate d-block">
                        Comprehensive User Guide
                      </span>
                    </th>
                    <td>
                      <a
                        href="javascript:void(0)"
                        className="link-primary text-dark fw-medium d-block"
                      >
                        /docs
                      </a>
                    </td>
                    <td className="text-center fw-medium">800</td>
                    <td className="text-center fw-medium">$5,50</td>
                  </tr>
                  <tr>
                    <th scope="row" className="ps-0 fw-medium border-0">
                      <span className="table-link1 text-truncate d-block">
                        Check out our services
                      </span>
                    </th>
                    <td className="border-0">
                      <a
                        href="javascript:void(0)"
                        className="link-primary text-dark fw-medium d-block"
                      >
                        /services
                      </a>
                    </td>
                    <td className="text-center fw-medium border-0">1300</td>
                    <td className="text-center fw-medium border-0">$2,15</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center gap-2 mb-5 pb-3">
              Sessions by device
              <span>
                <iconify-icon
                  icon="solar:question-circle-bold"
                  className="fs-7 d-flex text-muted"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-success"
                  data-bs-title="Locations"
                />
              </span>
            </h5>
            <div className="row">
              <div className="col-4">
                <iconify-icon
                  icon="solar:laptop-minimalistic-line-duotone"
                  className="fs-7 d-flex text-primary"
                />
                <span className="fs-11 mt-2 d-block text-nowrap">
                  Computers
                </span>
                <h4 className="mb-0 mt-1">87%</h4>
              </div>
              <div className="col-4">
                <iconify-icon
                  icon="solar:smartphone-line-duotone"
                  className="fs-7 d-flex text-secondary"
                />
                <span className="fs-11 mt-2 d-block text-nowrap">
                  Smartphone
                </span>
                <h4 className="mb-0 mt-1">9.2%</h4>
              </div>
              <div className="col-4">
                <iconify-icon
                  icon="solar:tablet-line-duotone"
                  className="fs-7 d-flex text-success"
                />
                <span className="fs-11 mt-2 d-block text-nowrap">Tablets</span>
                <h4 className="mb-0 mt-1">3.1%</h4>
              </div>
            </div>
            <div className="vstack gap-4 mt-7 pt-2">
              <div>
                <div className="hstack justify-content-between">
                  <span className="fs-3 fw-medium">Computers</span>
                  <h6 className="fs-3 fw-medium text-dark lh-base mb-0">87%</h6>
                </div>
                <div
                  className="progress mt-6"
                  role="progressbar"
                  aria-label="Warning example"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div>
                <div className="hstack justify-content-between">
                  <span className="fs-3 fw-medium">Smartphones</span>
                  <h6 className="fs-3 fw-medium text-dark lh-base mb-0">
                    9.2%
                  </h6>
                </div>
                <div
                  className="progress mt-6"
                  role="progressbar"
                  aria-label="Warning example"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar bg-secondary"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
              <div>
                <div className="hstack justify-content-between">
                  <span className="fs-3 fw-medium">Tablets</span>
                  <h6 className="fs-3 fw-medium text-dark lh-base mb-0">
                    3.1%
                  </h6>
                </div>
                <div
                  className="progress mt-6"
                  role="progressbar"
                  aria-label="Warning example"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
  
</div>

    </div>
  );
};

export default Layout;
