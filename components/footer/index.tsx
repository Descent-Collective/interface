import { DiscordIcon, GithubIcon, GoIcon, LogoIcon, TwiiterIcon } from '@/public/icons';
import { DescentClickAnimation, DescentContainer } from '..';
import classNames from 'classnames';

const content = [
  {
    title: 'About Us',
    links: [
      {
        title: 'Terms',
        link: '#',
      },
      {
        title: 'Privacy Policy',
        link: '#',
      },
      {
        title: 'Community',
        link: '#',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Documentation',
        link: 'https://docs.descentdao.com',
      },
      {
        title: 'Blog',
        link: '#',
      },
    ],
  },
  {
    title: 'Products',
    links: [
      {
        title: 'Borrow',
        link: 'https://descentdao.com/app',
      },
      {
        title: 'Earn',
        link: '#',
        isCommingSoon: true,
      },
    ],
  },
];

const DescentFooter = () => {
  return (
    <DescentContainer>
      <footer className="py-[72px] md:mx-7 mt-16">
        <div className="flex flex-col md:flex-row gap-16 xl:gap-0 justify-between xl:z-10">
          <div>
            <LogoIcon />
            <div className="mt-3 pl-10 flex items-center gap-5 relative z-10">
              <DescentClickAnimation>
                <a
                  href="https://github.com/Descent-Collective"
                  target="_blank"
                  rel="noopener noreferrer">
                  <GithubIcon />
                </a>
              </DescentClickAnimation>
              <DescentClickAnimation>
                <a href="https://twitter.com/DescentDAO" target="_blank" rel="noopener noreferrer">
                  <TwiiterIcon />
                </a>
              </DescentClickAnimation>
              <DescentClickAnimation>
                <a href="https://discord.gg/avjHYmueHf" target="_blank" rel="noopener noreferrer">
                  <DiscordIcon />
                </a>
              </DescentClickAnimation>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-12 xl:gap-20">
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20">
              {content.map((item, index) => (
                <div
                  key={index}
                  className="md:order-1 xl:order-2 flex flex-col gap-6 text-black-100">
                  <h6 className="text-lg xl:text-xl font-semibold">{item.title}</h6>
                  {item.links.map((link, id) => (
                    <div key={id} className="flex items-center gap-3">
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classNames('text-sm xl:text-base whitespace-nowrap', {
                          'text-grey-500': link.isCommingSoon,
                        })}>
                        {link.title}
                      </a>

                      {link.isCommingSoon && (
                        <div className="bg-green-300 py-2 px-[10px] rounded-2xl text-xs text-grey-500 whitespace-nowrap">
                          Coming to mainnet
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="xl:flex flex-col text-black-100 md:hidden">
              <h6 className="text-lg xl:text-xl font-semibold mb-6">
                Stay up to date with Descent
              </h6>
              <div className="text-sm xl:text-base mb-6">
                Subscribe to the newsletter for Descent updates
              </div>
              <div className="flex items-center justify-between rounded-[32px] pl-5 pr-2 h-14 border border-grey-650 md:w-[370px] xl:w-auto xl:relative xl:z-10">
                <input
                  className="w-full h-full bg-transparent outline-none text-sm md:text-base text-grey-650"
                  placeholder="Enter email address here"
                />
                <DescentClickAnimation>
                  <button
                    type="button"
                    className="h-11 rounded-[20px] flex items-center justify-center gap-1 px-3 bg-black-100">
                    <div className="text-xs md:text-sm font-medium text-white-50">Subscribe</div>

                    <GoIcon />
                  </button>
                </DescentClickAnimation>
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex flex-col gap-6 text-black-100 hidden xl:hidden pt-16">
          <h6 className="text-lg xl:text-xl font-semibold">Stay up to date with Descent</h6>
          <div className="text-sm xl:text-base">
            Subscribe to the newsletter for Descent updates
          </div>
          <div className="flex items-center justify-between rounded-[32px] pl-5 pr-2 h-14 border border-grey-650 md:w-[370px] xl:w-auto relative">
            <input
              className="w-full h-full bg-transparent outline-none text-sm md:text-base text-grey-650"
              placeholder="Enter email address here"
            />
            <DescentClickAnimation>
              <button
                type="button"
                className="h-11 rounded-[20px] flex items-center justify-center gap-1 px-3 bg-black-100">
                <div className="text-xs md:text-sm font-medium text-white-50">Subscribe</div>

                <GoIcon />
              </button>
            </DescentClickAnimation>
          </div>
        </div>
      </footer>
    </DescentContainer>
  );
};

export default DescentFooter;
