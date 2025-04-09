import Image from 'next/image';
import Link from 'next/link';

export default function About() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <article className="prose prose-lg prose-invert max-w-none">
                    <h1 className="text-4xl font-bold mb-8">About</h1>

                    <p>
                        My name is Andrés, I am a Software Engineer, currently working for Oracle in the Java Platform Group.
                        I&apos;m helping to develop the <Link
                            href="https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html"
                            className="text-blue-400 hover:text-blue-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            JMS (Java Management Service)
                        </Link> which is a free service for all the OCI users.
                    </p>

                    <p>
                        I love learning new technologies and using them to build real projects.
                    </p>

                    <p>
                        After some hesitation on whether or not should I start my own blog, I decided to give it a shot.
                        Therefore, I would like to ask you the same thing I constantly ask my co-workers: Give me as much
                        feedback as possible and it would be much appreciated!
                    </p>

                    <p>
                        It&apos;s also really satisfying to me to stay up-to-date in the current software ecosystem and
                        I think this blog may come handy for it.
                    </p>

                    <p>
                        I will try to give you the very best in Software Engineering, with a focus on Java, DevOps,
                        and career advices you might (or not) find useful.
                    </p>

                    <p>
                        I hope you enjoy my blog. If you have any questions or comments, please contact me through
                        the link to the contact form.
                    </p>
                    {/* Profile Image */}
                    <div className="relative w-full max-w-md aspect-square mb-8">
                        <Image
                            src="/images/pic_photo.jpg"
                            alt="Andrés Tascón"
                            fill
                            className="object-cover rounded-lg shadow-lg"
                            priority
                        />
                    </div>
                </article>
            </div>
        </div>
    );
} 