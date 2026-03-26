import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createContactSubmission } from '@/db/api';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service_interest: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service_interest: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await createContactSubmission(data);
      toast.success('Thank you! Your message has been sent successfully.');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="gradient-text-colorful">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to start your project? Contact us today for a free consultation and let's discuss how we can help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service_interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interest</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="website">Website Development</SelectItem>
                            <SelectItem value="mobile">Mobile App Development</SelectItem>
                            <SelectItem value="uiux">UI/UX Design</SelectItem>
                            <SelectItem value="software">Software Development</SelectItem>
                            <SelectItem value="cloud">Cloud Integration</SelectItem>
                            <SelectItem value="consultation">Free IT Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    rules={{ required: 'Message is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions? We're here to help. Reach out to us through any of the following channels.
                </p>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6 flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">hrsacdeveloper@gmail.com</p>
                  </div>
                </div>

                <div className="glass-card p-6 flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 9421920479</p>
                    <p className="text-muted-foreground">Mon-Sat, 9am-7pm IST</p>
                  </div>
                </div>

                <div className="glass-card p-6 flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground">
                      Survey No-39, Dhayari Narhe Rd
                      <br />
                      Narhe, Pune, Maharashtra 411041
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="glass-card p-4">
                <iframe
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB_LJOYJL-84SMuxNB7LtRGhxEQLjswvy0&language=en&region=in&q=Survey+No-39,+Dhayari+Narhe+Rd,+Narhe,+Pune,+Maharashtra+411041"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
