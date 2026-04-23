# Vehicle Service Management System

## Overview

A full-stack web application built to streamline vehicle servicing operations.
The system helps manage spare parts inventory, vehicle repair requests, issue diagnosis, pricing, payment simulation, and revenue analytics.

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Recharts

### Backend

* Django
* Django REST Framework

### Database

* SQLite

## Features

### 1. Component Registration & Pricing Management

* Add new vehicle components
* Maintain purchase price
* Maintain repair price
* Track stock quantity

### 2. Vehicle Repair Tracking

* Register incoming vehicles
* Store owner and vehicle details
* Capture issue descriptions
* Update service status:

  * Pending
  * In Progress
  * Completed
  * Delivered

### 3. Issue Reporting & Component Selection

* Select vehicle
* Select component
* Add issue name
* Choose:

  * Repair
  * Replace

### 4. Final Price Calculation & Payment

* Component pricing logic
* Labor charge support
* Extra charge support
* Simulated payment processing

### 5. Revenue Analytics

* Daily revenue graph
* Monthly revenue graph
* Yearly revenue graph
* Responsive dashboards

## Project Structure

```text id="q7n2la"
vehicle-service-system/
│── backend/
│── frontend/
│── README.md
```

## Run Project Locally

### Backend

```bash id="u1m7ra"
cd backend
python manage.py runserver
```

### Frontend

```bash id="r3k8tx"
cd frontend
npm install
npm start
```

## API Endpoints

```text id="p6v1lc"
/api/components/
/api/vehicles/
/api/issues/
/api/payments/
/api/revenue/
/api/revenue/monthly/
/api/revenue/yearly/
```

## Future Enhancements

* Authentication & Role-based Login
* Email Notifications
* Invoice PDF Generation
* Online Payments
* Cloud Deployment


