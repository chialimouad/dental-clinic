-- SmileCare Dental Clinic Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PATIENTS TABLE
-- ============================================
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX idx_patients_email ON patients(email);

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DOCTORS TABLE
-- ============================================
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT,
    bio TEXT,
    image_url TEXT,
    specializations TEXT[] DEFAULT '{}',
    education TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- AVAILABILITY SLOTS TABLE
-- ============================================
CREATE TABLE doctor_vacations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- AVAILABILITY SLOTS TABLE
-- ============================================
CREATE TABLE availability_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(doctor_id, slot_date, start_time)
);

-- Index for date-based queries
CREATE INDEX idx_availability_date ON availability_slots(slot_date);
CREATE INDEX idx_availability_doctor ON availability_slots(doctor_id);

-- ============================================
-- APPOINTMENTS TABLE
-- ============================================
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(doctor_id, appointment_date, appointment_time)
);

-- Indexes for appointment queries
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_status ON appointments(status);

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    tags TEXT[] DEFAULT '{}',
    author TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for slug lookups
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(is_published, published_at);

-- ============================================
-- ADMIN USERS TABLE
-- ============================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    treatment TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_vacations ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access to testimonials
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
    FOR SELECT USING (is_active = true);

-- Public read access to services
CREATE POLICY "Services are viewable by everyone" ON services
    FOR SELECT USING (is_active = true);

-- Public read access to doctors
CREATE POLICY "Doctors are viewable by everyone" ON doctors
    FOR SELECT USING (is_active = true);

-- Public read access to published blog posts
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (is_published = true);

-- Public read access to available slots
CREATE POLICY "Available slots are viewable by everyone" ON availability_slots
    FOR SELECT USING (is_available = true);

-- Allow anyone to create appointments
CREATE POLICY "Anyone can create appointments" ON appointments
    FOR INSERT WITH CHECK (true);

-- Allow anyone to create patients (for booking)
CREATE POLICY "Anyone can create patients" ON patients
    FOR INSERT WITH CHECK (true);

-- Allow anyone to submit contact messages
CREATE POLICY "Anyone can submit contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Admin full access policies (requires authentication)
CREATE POLICY "Admins can do everything with services" ON services
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.id = auth.uid()
        )
    );

CREATE POLICY "Admins can do everything with doctors" ON doctors
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.id = auth.uid()
        )
    );

CREATE POLICY "Admins can do everything with appointments" ON appointments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.id = auth.uid()
        )
    );

CREATE POLICY "Admins can do everything with patients" ON patients
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.id = auth.uid()
        )
    );

CREATE POLICY "Admins can do everything with availability" ON availability_slots
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.id = auth.uid()
        )
    );

CREATE POLICY "Admins can do everything with blog posts" ON blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.id = auth.uid()
        )
    );

CREATE POLICY "Admins can view contact messages" ON contact_messages
            WHERE admin_users.id = auth.uid()
        )
    );

CREATE POLICY "Admins can do everything with testimonials" ON testimonials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.id = auth.uid()
        )
    );

CREATE POLICY "Admins can do everything with doctor_vacations" ON doctor_vacations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.id = auth.uid()
        )
    );

-- ============================================
-- SEED DATA
-- ============================================

-- Insert sample services
-- Insert sample services
INSERT INTO services (title, description, duration_minutes, price, icon, sort_order) VALUES
('General Dentistry', 'Comprehensive dental care including check-ups, cleanings, and preventive treatments to maintain your oral health.', 60, 500.00, 'Stethoscope', 1),
('Teeth Whitening', 'Professional whitening treatments to brighten your smile and remove stains for a radiant, confident appearance.', 90, 5000.00, 'Sparkles', 2),
('Dental Implants', 'Permanent tooth replacement solution that looks, feels, and functions like natural teeth.', 120, 25000.00, 'Component', 3),
('Orthodontics', 'Straighten your teeth with modern braces or clear aligners for a perfectly aligned smile.', 45, 40000.00, 'AlignCenter', 4),
('Root Canal Treatment', 'Save your natural tooth with our gentle, effective root canal therapy performed with precision.', 90, 4000.00, 'Heart', 5),
('Cosmetic Dentistry', 'Transform your smile with veneers, bonding, and other cosmetic procedures for a stunning look.', 60, 8000.00, 'Gem', 6),
('Pediatric Dentistry', 'Gentle, child-friendly dental care designed to make visits fun and stress-free for young patients.', 45, 800.00, 'Baby', 7),
('Emergency Dental Care', 'Immediate attention for dental emergencies including severe pain, broken teeth, and infections.', 60, 1000.00, 'AlertCircle', 8);

-- Insert sample doctors
-- Insert sample doctors
INSERT INTO doctors (name, title, bio, specializations, education, sort_order) VALUES
('Dr. Priya Patel', 'Lead Dentist & Founder', 'With over 15 years of experience, Dr. Patel specializes in cosmetic and restorative dentistry. She founded SmileCare to provide world-class dental care in Ahmedabad.', ARRAY['Cosmetic Dentistry', 'Dental Implants', 'General Dentistry'], 'MDS, Gujarat University', 1),
('Dr. Rajesh Kumar', 'Orthodontist', 'Dr. Kumar is a certified orthodontist with expertise in Invisalign and traditional braces. He is passionate about creating beautiful, healthy smiles for patients of all ages.', ARRAY['Orthodontics', 'Invisalign', 'Pediatric Orthodontics'], 'MDS, AIIMS', 2),
('Dr. Anjali Mehta', 'Pediatric Dentist', 'Dr. Mehta loves working with children and has a special talent for making dental visits enjoyable. She focuses on preventive care and early intervention.', ARRAY['Pediatric Dentistry', 'Preventive Care', 'Sedation Dentistry'], 'MDS, Manipal College of Dental Sciences', 3),
('Dr. Vikram Shah', 'Oral Surgeon', 'Dr. Shah brings 20 years of surgical expertise to our team. He specializes in dental implants, wisdom teeth extraction, and complex oral surgeries.', ARRAY['Oral Surgery', 'Dental Implants', 'Wisdom Teeth'], 'MDS, Oral & Maxillofacial Surgery', 4);

-- Insert sample blog posts
-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, tags, author, is_published, published_at) VALUES
('10 Tips for Maintaining Healthy Teeth in Indian Diet', 'tips-for-healthy-teeth-indian-diet', 'Discover how to enjoy Indian cuisine while keeping your teeth and gums healthy with these expert tips.', E'# 10 Tips for Maintaining Healthy Teeth...', ARRAY['Oral Health', 'Diet', 'Tips'], 'Dr. Priya Patel', true, NOW() - INTERVAL '15 days'),
('Understanding Dental Implants: A Complete Guide', 'understanding-dental-implants', 'Learn everything you need to know about dental implants, from the procedure to recovery and long-term care.', E'# Understanding Dental Implants...', ARRAY['Dental Implants', 'Procedures', 'Guide'], 'Dr. Vikram Shah', true, NOW() - INTERVAL '10 days'),
('Is Invisalign Right for You? Pros and Cons Explained', 'invisalign-pros-and-cons', 'Considering clear aligners? We break down the advantages and limitations of Invisalign treatment.', E'# Is Invisalign Right for You?...', ARRAY['Orthodontics', 'Invisalign', 'Treatment Options'], 'Dr. Rajesh Kumar', true, NOW() - INTERVAL '5 days');

-- Insert sample testimonials
INSERT INTO testimonials (name, text, rating, treatment, is_active) VALUES
('Amit Shah', 'SmileCare transformed my smile. Dr. Patel is incredibly professional and the facility is state-of-the-art. Highly recommended!', 5, 'Teeth Whitening', true),
('Sneha Reddy', 'I was terrified of dentists until I came here. Dr. Kumar made me feel completely at ease. Best dental clinic in Ahmedabad.', 5, 'Orthodontics', true),
('Rahul Sharma', 'My kids love coming to see Dr. Mehta. She is wonderful with children. The clinic is very clean and hygienic.', 5, 'Pediatric Dentistry', true),
('Kavita Iyer', 'Got my dental implants done by Dr. Shah. The procedure was smooth and the results are fantastic. Great value for money.', 5, 'Dental Implants', true);

-- Generate availability slots for the next 30 days
DO $$
DECLARE
    doc RECORD;
    slot_date_var DATE := CURRENT_DATE;
    end_date_var DATE := CURRENT_DATE + INTERVAL '30 days';
    slot_time TIME;
BEGIN
    FOR doc IN SELECT id FROM doctors LOOP
        WHILE slot_date_var <= end_date_var LOOP
            -- Skip Sundays
            IF EXTRACT(DOW FROM slot_date_var) != 0 THEN
                slot_time := '09:00:00';
                -- Generate slots from 9 AM to 5 PM
                WHILE slot_time < '17:00:00' LOOP
                    INSERT INTO availability_slots (doctor_id, slot_date, start_time, end_time, is_available)
                    VALUES (doc.id, slot_date_var, slot_time, slot_time + INTERVAL '30 minutes', true)
                    ON CONFLICT DO NOTHING;
                    slot_time := slot_time + INTERVAL '30 minutes';
                END LOOP;
            END IF;
            slot_date_var := slot_date_var + INTERVAL '1 day';
        END LOOP;
        slot_date_var := CURRENT_DATE;
    END LOOP;
END $$;

