/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export const setCookieConsent = (state) => {
    try {
        if (window.gtag) {
            const consentOptions = {
                ad_user_data: state,
                ad_personalization: state,
                ad_storage: state,
                analytics_storage: state,
            };
            if (state === 'denied') {
                window.gtag('consent', 'default', {
                    ...consentOptions,
                    wait_for_update: 500,
                });
            }
            else if (state === 'granted') {
                window.gtag('consent', 'update', {
                    ...consentOptions,
                });
            }
        }
    }
    catch {
        if (state === 'denied') {
            console.error('Unable to set default cookie consent.');
        }
        else if (state === 'granted') {
            console.error('Unable to grant cookie consent.');
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy91dGlscy9hbmFseXRpY3MudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBUUgsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUEyQixFQUFRLEVBQUU7SUFDcEUsSUFBSSxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsTUFBTSxjQUFjLEdBQUc7Z0JBQ3JCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixrQkFBa0IsRUFBRSxLQUFLO2dCQUN6QixVQUFVLEVBQUUsS0FBSztnQkFDakIsaUJBQWlCLEVBQUUsS0FBSzthQUN6QixDQUFDO1lBRUYsSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtvQkFDaEMsR0FBRyxjQUFjO29CQUNqQixlQUFlLEVBQUUsR0FBRztpQkFDckIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFO29CQUMvQixHQUFHLGNBQWM7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUN6RCxDQUFDO2FBQU0sSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIGd0YWc6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc2V0Q29va2llQ29uc2VudCA9IChzdGF0ZTogJ2RlbmllZCcgfCAnZ3JhbnRlZCcpOiB2b2lkID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAod2luZG93Lmd0YWcpIHtcbiAgICAgIGNvbnN0IGNvbnNlbnRPcHRpb25zID0ge1xuICAgICAgICBhZF91c2VyX2RhdGE6IHN0YXRlLFxuICAgICAgICBhZF9wZXJzb25hbGl6YXRpb246IHN0YXRlLFxuICAgICAgICBhZF9zdG9yYWdlOiBzdGF0ZSxcbiAgICAgICAgYW5hbHl0aWNzX3N0b3JhZ2U6IHN0YXRlLFxuICAgICAgfTtcblxuICAgICAgaWYgKHN0YXRlID09PSAnZGVuaWVkJykge1xuICAgICAgICB3aW5kb3cuZ3RhZygnY29uc2VudCcsICdkZWZhdWx0Jywge1xuICAgICAgICAgIC4uLmNvbnNlbnRPcHRpb25zLFxuICAgICAgICAgIHdhaXRfZm9yX3VwZGF0ZTogNTAwLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdncmFudGVkJykge1xuICAgICAgICB3aW5kb3cuZ3RhZygnY29uc2VudCcsICd1cGRhdGUnLCB7XG4gICAgICAgICAgLi4uY29uc2VudE9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgaWYgKHN0YXRlID09PSAnZGVuaWVkJykge1xuICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIHNldCBkZWZhdWx0IGNvb2tpZSBjb25zZW50LicpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdncmFudGVkJykge1xuICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGdyYW50IGNvb2tpZSBjb25zZW50LicpO1xuICAgIH1cbiAgfVxufTtcbiJdfQ==