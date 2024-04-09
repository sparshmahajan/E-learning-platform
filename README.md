# E-Learning Platform

## Description

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
DB_URL= DATABASE_URL
JWT_KEY= some key
CLOUDINARY_CLOUD_NAME= cloudinary-cloud-name
CLOUDINARY_API_KEY= cloudinary-api-key
CLOUDINARY_API_SECRET= cloudinary-api-secret
MAIL_SENDER= mail-sender-email
MAIL_PASS= mail-sender-app-password
```

## Run Locally

Clone the project

```bash
git clone https://github.com/sparshmahajan/E-learning-platform.git
```

Go to the project directory

```bash
cd E-learning-platform
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

The server will start at http://localhost:3000

## API Reference

This project exposes the following endpoints:

### User Endpoints

#### Register User

```http
  POST /api/users/register
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | **Required**. Name of the user     |
| `email`    | `string` | **Required**. Email of the user    |
| `password` | `string` | **Required**. Password of the user |
| `image`    | `file`   | Image of the user                  |

#### Verify Email

```http
  POST /api/users/verify
```

| Body    | Type     | Description                        |
| :------ | :------- | :--------------------------------- |
| `email` | `string` | **Required**. Email of the user    |
| `otp`   | `string` | **Required**. OTP sent to the user |

#### Login User

```http
  POST /api/users/login
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `email`    | `string` | **Required**. Email of the user    |
| `password` | `string` | **Required**. Password of the user |

#### Get User Profile

```http
  GET /api/users
```

#### Update User Details

```http
  PUT /api/users
```

| Body    | Type     | Description                                         |
| :------ | :------- | :-------------------------------------------------- |
| `name`  | `string` | **Required**. updated or original name of the user  |
| `email` | `string` | **Required**. updated or original email of the user |

#### Update User Image

```http
  PUT /api/users/profile-pic
```

| Body    | Type   | Description       |
| :------ | :----- | :---------------- |
| `image` | `file` | Image of the user |

#### Change Password

```http
  PUT /api/users/password
```

| Body          | Type     | Description                        |
| :------------ | :------- | :--------------------------------- |
| `oldPassword` | `string` | **Required**. Old password of user |
| `newPassword` | `string` | **Required**. New password of user |

#### Remove User

```http
  DELETE /api/users
```

#### Forgot Password

```http
  POST /api/users/forgot-password
```

| Body    | Type     | Description                     |
| :------ | :------- | :------------------------------ |
| `email` | `string` | **Required**. Email of the user |

#### Reset Password

```http
  POST /api/users/reset-password
```

| Body       | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `email`    | `string` | **Required**. Email of the user        |
| `otp`      | `string` | **Required**. OTP sent to the user     |
| `password` | `string` | **Required**. New password of the user |

### Admin Endpoints

#### Register Admin

```http
  POST /api/admin/register
```

| Body       | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `name`     | `string` | **Required**. Name of the admin     |
| `email`    | `string` | **Required**. Email of the admin    |
| `password` | `string` | **Required**. Password of the admin |
| `image`    | `file`   | Image of the admin                  |

#### Verify Email

```http
  POST /api/admin/verify
```

| Body    | Type     | Description                         |
| :------ | :------- | :---------------------------------- |
| `email` | `string` | **Required**. Email of the admin    |
| `otp`   | `string` | **Required**. OTP sent to the admin |

#### Login Admin

```http
  POST /api/admin/login
```

| Body       | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `email`    | `string` | **Required**. Email of the admin    |
| `password` | `string` | **Required**. Password of the admin |

#### Get Admin Profile

```http
  GET /api/admin
```

#### Update Admin Details

```http
  PUT /api/admin
```

| Body    | Type     | Description                                          |
| :------ | :------- | :--------------------------------------------------- |
| `name`  | `string` | **Required**. updated or original name of the admin  |
| `email` | `string` | **Required**. updated or original email of the admin |

#### Update Admin Image

```http
  PUT /api/admin/profile-pic
```

| Body    | Type   | Description        |
| :------ | :----- | :----------------- |
| `image` | `file` | Image of the admin |

#### Change Password

```http
  PUT /api/admin/password
```

| Body          | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `oldPassword` | `string` | **Required**. Old password of admin |
| `newPassword` | `string` | **Required**. New password of admin |

#### Remove Admin

```http
  DELETE /api/admin
```

#### Forgot Password

```http
  POST /api/admin/forgot-password
```

| Body    | Type     | Description                      |
| :------ | :------- | :------------------------------- |
| `email` | `string` | **Required**. Email of the admin |

#### Reset Password

```http
  POST /api/admin/reset-password
```

| Body       | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `email`    | `string` | **Required**. Email of the admin        |
| `otp`      | `string` | **Required**. OTP sent to the admin     |
| `password` | `string` | **Required**. New password of the admin |

### Course Endpoints

#### Create Course - Only Admin

```http
  POST /api/courses
```

| Body          | Type     | Description                                                          |
| :------------ | :------- | :------------------------------------------------------------------- |
| `title`       | `string` | **Required**. Title of the course                                    |
| `description` | `string` | **Required**. Description of the course                              |
| `image`       | `file`   | **Required**. Image of the course                                    |
| `duration`    | `number` | **Required**. Duration of the course                                 |
| `category`    | `string` | **Required**. Category of the course                                 |
| `popularity`  | `number` | **Required**. Popularity of the course                               |
| `level`       | `string` | **Required**. Level of the course (Beginner, Intermediate, Advanced) |

#### Get All Courses - Both User and Admin

```http
  GET /api/courses
```

| query        | Type     | Description                              |
| :----------- | :------- | :--------------------------------------- |
| `page`       | `number` | Page number (default: 1)                 |
| `limit`      | `number` | Number of courses per page (default: 10) |
| `category`   | `string` | Category of the course (optional)        |
| `level`      | `string` | Level of the course (optional)           |
| `popularity` | `string` | Range of popularity (optional)           |

#### Get Course By ID - Both User and Admin

```http
  GET /api/courses/:courseId
```

#### Update Course - Only Admin

```http
  PUT /api/courses/:courseId
```

| Body          | Type     | Description                                                                              |
| :------------ | :------- | :--------------------------------------------------------------------------------------- |
| `title`       | `string` | **Required**. updated or original title of the course                                    |
| `description` | `string` | **Required**. updated or original description of the course                              |
| `image`       | `file`   | updated or original image of the course                                                  |
| `duration`    | `number` | **Required**. updated or original duration of the course                                 |
| `category`    | `string` | **Required**. updated or original category of the course                                 |
| `popularity`  | `number` | **Required**. updated or original popularity of the course                               |
| `level`       | `string` | **Required**. updated or original level of the course (Beginner, Intermediate, Advanced) |

#### Delete Course - Only Admin

```http
  DELETE /api/courses/:courseId
```

### Enroll Endpoints

#### Enroll Course - Only User

```http
  POST /api/enroll
```

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `courseId` | `string` | **Required**. ID of the course |

#### Get Enrolled Courses - Only User

```http
  GET /api/enroll
```

| query   | Type     | Description                              |
| :------ | :------- | :--------------------------------------- |
| `page`  | `number` | Page number (default: 1)                 |
| `limit` | `number` | Number of courses per page (default: 10) |

## POSTMAN Collection

The POSTMAN collection for the API can be found [here](https://elements.getpostman.com/redirect?entityId=22859744-3071bee8-d3c0-425f-b2e4-0669f42de7b5&entityType=collection)

## Tech Stack

**Server:** Node, Express, Sequelize, TypeScript

**Database:** Neon Console (Postgres)

**Containerization:** Docker

**Cloud Storage:** Cloudinary

**Email Service:** Nodemailer
