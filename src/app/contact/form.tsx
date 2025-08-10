'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormState } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Textarea } from '@components/ui/textarea';

import { useToast } from '@components/ui/use-toast';
import { useSendEmail } from '@utils/hooks/email';

export const formSchema = z.object({
  type: z.string({ required_error: 'Type is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

export const ContactForm = () => {
  const { toast } = useToast();
  const sendEmailMutation = useSendEmail();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'feedback',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { isSubmitting } = useFormState({
    control: form.control,
  });

  const submitProxy = async (data: z.infer<typeof formSchema>) => {
    toast({ title: 'Sending...', description: 'Please be patient!' });

    try {
      await sendEmailMutation.mutateAsync(data);
      toast({ title: 'Sent!', description: 'Thanks for your feedback!' });
      form.reset();
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast({
          variant: 'destructive',
          title: 'Invalid Input',
          description: 'Please check your input and try again.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          description: 'Please try again later.',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitProxy)}
        className="flex w-4/5 max-w-lg flex-auto flex-col gap-4 lg:w-5/12"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="enquiry">Enquiry</SelectItem>
                  <SelectItem value="hireme">Hire Me</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Please select most relevant contact reason</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>Please enter your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Your subject" {...field} />
              </FormControl>
              <FormDescription>Please enter your subject</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message" {...field} />
              </FormControl>
              <FormDescription>Please enter your message</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};
