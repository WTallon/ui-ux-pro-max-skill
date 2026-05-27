-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- USERS
CREATE POLICY "Users can view their own record" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Service role can do everything on users" ON users
  USING (auth.role() = 'service_role');

-- FREELANCER PROFILES
CREATE POLICY "Anyone can view approved freelancer profiles" ON freelancer_profiles
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Freelancer can view own profile" ON freelancer_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Freelancer can insert own profile" ON freelancer_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Freelancer can update own profile" ON freelancer_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all freelancer profiles" ON freelancer_profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- CLIENT PROFILES
CREATE POLICY "Client can view own profile" ON client_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Client can insert own profile" ON client_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Client can update own profile" ON client_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all client profiles" ON client_profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- APPLICATIONS
CREATE POLICY "Freelancer can view own application" ON applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM freelancer_profiles WHERE id = applications.freelancer_id AND user_id = auth.uid())
  );

CREATE POLICY "Freelancer can insert own application" ON applications
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM freelancer_profiles WHERE id = applications.freelancer_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all applications" ON applications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- INQUIRIES
CREATE POLICY "Client can view own inquiries" ON inquiries
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM client_profiles WHERE id = inquiries.client_id AND user_id = auth.uid())
  );

CREATE POLICY "Client can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM client_profiles WHERE id = inquiries.client_id AND user_id = auth.uid())
  );

CREATE POLICY "Freelancer can view inquiries about them" ON inquiries
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM freelancer_profiles WHERE id = inquiries.freelancer_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can view all inquiries" ON inquiries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- SUBSCRIPTIONS
CREATE POLICY "Client can view own subscription" ON subscriptions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM client_profiles WHERE id = subscriptions.client_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all subscriptions" ON subscriptions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
