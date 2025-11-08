import express from 'express'
import adminRoutes from './Admin.routes.js';
import FeedbackAndComplainRoutes from './FeedbackAndComplaint.routes.js';
import SeoRoutes from './Seo.router.js';
import SliderRoutes from './Slider.routes.js';
import VideoRoute from './Video.router.js';
import TestimonialRoute from './Testimonial.routes.js';
import BlogRoute from './Blog.routes.js';
import ContactRoute from './Contact.routes.js';
import FaqRoutes from './Faq.routes.js';
import NoticeRoutes from './Notice.routes.js';
import ExamCalenderRoutes from './ExamCalender.routes.js';
import GalleryRoutes from './Gallery.route.js';
import EventRoutes from './Event.routes.js';
const routes = express.Router();

routes.use("/Admin",adminRoutes)
routes.use("/Contact",ContactRoute,)
routes.use("/FeedbackAndComplain",FeedbackAndComplainRoutes,)
routes.use("/Seo",SeoRoutes,)
routes.use("/Slider",SliderRoutes)
routes.use("/Video",VideoRoute)
routes.use("/Testimonial",TestimonialRoute)
routes.use("/blogs",BlogRoute)
routes.use("/Faq",FaqRoutes)
routes.use("/Notice",NoticeRoutes)
routes.use("/Event",EventRoutes)
routes.use("/ExamCalender",ExamCalenderRoutes)
routes.use("/gallery",GalleryRoutes,)

export default routes;