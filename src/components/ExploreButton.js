import styled from 'styled-components';

export function ExploreButton() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <a href="/home" class="learn-more">
      <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
      </span>
      <span class="button-text">Explore</span>
    </a>
  `;

  // Add styles to document head if not already present
  if (!document.getElementById('explore-button-styles')) {
    const style = document.createElement('style');
    style.id = 'explore-button-styles';
    style.textContent = `
      .learn-more {
        position: relative;
        display: inline-block;
        cursor: pointer;
        outline: none;
        border: 0;
        vertical-align: middle;
        text-decoration: none;
        background: transparent;
        padding: 0;
        font-size: inherit;
        font-family: inherit;
        width: 12rem;
        height: auto;
      }

      .learn-more .circle {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        position: relative;
        display: block;
        margin: 0;
        width: 3rem;
        height: 3rem;
        background: #000000;
        border-radius: 1.625rem;
      }

      .learn-more .circle .icon {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background: #fff;
      }

      .learn-more .circle .icon.arrow {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        left: 0.625rem;
        width: 1.125rem;
        height: 0.125rem;
        background: none;
      }

      .learn-more .circle .icon.arrow::before {
        position: absolute;
        content: "";
        top: -0.29rem;
        right: 0.0625rem;
        width: 0.625rem;
        height: 0.625rem;
        border-top: 0.125rem solid #fff;
        border-right: 0.125rem solid #fff;
        transform: rotate(45deg);
      }

      .learn-more .button-text {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0.75rem 0;
        margin: 0 0 0 1.85rem;
        color:rgb(255, 255, 255);
        font-weight: 700;
        line-height: 1.6;
        text-align: center;
        text-transform: uppercase;
      }

      .learn-more:hover .circle {
        width: 100%;
        background: linear-gradient(to right, #000000, #FF3939);
      }

      .learn-more:hover .circle .icon.arrow {
        background: #fff;
        transform: translate(1rem, 0);
      }

      .learn-more:hover .button-text {
        color: #fff;
      }
    `;
    document.head.appendChild(style);
  }

  return wrapper.innerHTML;
}